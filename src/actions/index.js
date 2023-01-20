
export const createBlog = (blog) => {
    return (dispatch, getState, { getFirestore}) => {
        //make async call to db
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId= getState().firebase.auth.uid;
        firestore.collection('blogs').add({
            ...blog,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createAt: new Date()
        }).then(()=> {
            dispatch({type: 'CREATE_BLOG', blog})
        }).catch((err) => {
            dispatch({type:'CREATE_BLOG_ERROR', err});
        })
       ;
    }
};