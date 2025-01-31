import { postModal } from '../schemas/posts.js';
import { getPostID } from '../helper/common.js';
import amqp from 'amqplib';

const rabbitMqUrl = process.env.RABBITMQ_URL || 'amqp://user:password@localhost'; // Replace with your RabbitMQ server URL

async function postToRmqExchange(exchangeName, messagedata, operation) {
  try {
    const connection = await amqp.connect(rabbitMqUrl);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
    // Send data like this:
    channel.publish(exchangeName, '', Buffer.from(JSON.stringify({ ...messagedata, timestamp: new Date(), operation: operation })));

    console.log(`${exchangeName} sent data to RabbitMQ:`, { ...messagedata, timestamp: new Date(), operation: operation });
  } catch (error) {
    console.error(`Error connecting ${exchangeName} to RabbitMQ:`, error);
  }
}

export async function createNewPost(userId, text, visibility) {
  try {
    console.log(userId, text, visibility);
    //Check if input is valid
    if (!userId || !text || !visibility) {
      console.log(userId);
      throw new Error('userId, text, or visibility is missing or undefined');
    }
    let counter = await getPostID();
    console.log('Creating new posts');
    await postModal.create({ userId, text, visibility, postId: counter });
    console.log('Created new posts successfully');
    console.log('Sending to event bus');
    await postToRmqExchange('FriendPostPostAdded', { post: { userId, text, visibility, postId: counter } });
    return {
      status: 200,
      data: { postId: counter, visibility: visibility },
    };
  } catch (error) {
    return { status: 400, success: false, message: error };
  }
}

export async function deletePost(postId) {
  try {
    console.log(`Deleting post with postId: ${postId}`);
    const deletedPost = await postModal.findOneAndDelete({ postId });

    if (!deletedPost) {
      return {
        status: 404,
        message: 'Post not found',
      };
    }
    console.log('Post deleted successfully');
    return {
      status: 200,
      message: 'Post deleted successfully',
    };
  } catch (error) {
    return { status: 400, success: false, message: error.message };
  }
}

export const getPostByID = async (postId) => {
  try {
    const post = await postModal.findOne(
      { postId: postId },
      { _id: 0, __v: 0 }
    );
    return { status: post ? 200 : 404, data: post };
  } catch (error) {
    return { status: 500, success: false, message: error };
  }
};

export async function getAllPosts(
  userIds = [],
  visibility = '',
  limit = 100,
  skip
) {
  let query = {};
  if (
    (!userIds.length && visibility.toLowerCase() === 'public') ||
    (!userIds.length && !visibility)
  ) {
    query.visibility = 'public';
  }
  if (userIds.length) {
    query.userId = userIds;
    if (visibility)
      query.visibility = visibility == 'public' ? 'public' : 'private';
  }
  console.log(query);
  const results = await postModal
    .find(query, { _id: 0, __v: 0 })
    .limit(limit)
    .skip(skip);

  console.log(results);
  if (!results.length)
    return {
      status: 200,
      posts: [],
      totalPosts: 0,
    };
  const totalPosts = await postModal.countDocuments(query);
  return {
    status: 200,
    posts: results,
    totalPosts,
  };
}


export const deletPostsByuserID = async (userId) => {
  const userDeleted = await postModal.deleteMany({ userId });
  console.log(userDeleted);
  return {
    status: userDeleted.deletedCount ? 200 : 404,
    message: !userDeleted.deletedCount && 'Post does not exits for the user ID',
  };
};