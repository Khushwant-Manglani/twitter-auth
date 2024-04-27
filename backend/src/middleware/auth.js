import jwt from "jsonwebtoken";

const verifyToken = async(req, res ,next) => {
  try{
      let token = req.cookies.token;

      if(!token) return res.status(403).send("Acess Denied");

      const verified  = jwt.verify(token , process.env.JWT_SECRET);
      console.log(req.user);
      req.user = verified;
      next();
  }catch(err){
      res.status(500).json({error: err.message});
  }
};

export default verifyToken;