type studentsList=[]
interface Reviews{
    cooordinatorsId:String,
    students:studentsList

}

interface IReview{
    scheduledDate:{
        type:Date

    },
    
    scheduledReviews:Reviews[],
    students:[]
    coordinators:[]
}


export default IReview