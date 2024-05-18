
export interface ICounsellorRepository{
    createCounsellor(name:string,email:string,mobileNumber:number,branch:string):any
    blockCounsellor(id:string):any
}
