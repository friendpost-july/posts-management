export async function createNewPost(userId, text, visibility){
    try{
        //input
        const { userId, text, visibility } = input;
        //Check if input is valid
        if (userId === undefined || text === undefined || visibility === undefined) {
            throw new Error('userId, text, or visibility is missing or undefined');
        }
        //generate random post id
        const random_number = Math.floor(Math.random() * 1000); 
        // const postId = userId + '_' + random_number; 
        const postId = '1234'; 
        return{
            data:{postId,visibility}
        };
    }
    catch (error){
        return { status: 400, success: false, message: error };
    }
    }
