const wrapAsync = (fn)=>{
    return (req,res,next)=>{
         fn(req,res,next).catch(next); //  execute function
       
    }
}
export default wrapAsync;