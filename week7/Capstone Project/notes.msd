// Get All Authentications
authRouter.get("/", (req, res, next) => {
  User.find((err, authentication ) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(authentication )
    })
  })


  // Get One Authentication
authRouter.get("/:authenticationId", (req, res, next) => {
  Authentication.find(
        {_id: req.params.authenticationId},
       (err, foundAuthentication ) => {
               if(err) {
                   res.status(500)
                   return next(err)
               }
               return res.status(201).send(foundAuthentication)
           }
        )
     })

  // Add new Authentication
authRouter.post("/", (req, res, next) => {
    const newAuthentication  = new Authentication(req.body)
    newAuthentication.save((err, savedAuthentication ) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedAuthentication )
    })
  })

    // Delete Authentication
authRouter.delete("/:authenticationId", (req, res, next) => {
  Authentication.findOneAndDelete(
      { _id: req.params.AuthenticationId },
      (err, deletedAuthentication) => {
        if(err){
          res.status(500) 
          return next(err)
        }
        return res.status(200).send(`Successfully delete authentication.`)
      }
    )
  })


  // Update Authentication
authRouter.put("/:authenticationId", (req, res, next) => {
  Authentication.findOneAndUpdate(
      { _id: req.params.authenticationId },
      req.body,
      { new: true },
      (err, updatedAuthentication) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedAuthentication)
      }
    )
  })