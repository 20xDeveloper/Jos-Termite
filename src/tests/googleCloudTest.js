   // // -- Upload the file to google cloud storage --
                // const image = {
                //     uri: this.state.image.uri,
                //     type: this.state.image.type,
                //     name: 'userProfilePic' + '-' + Date.now() + '.jpg'
                //   }
                //   // Instantiate a FormData() object
                //   const imgBody = new FormData();
                //   // append the image to the object with the title 'image'
                //   imgBody.append('image', image);

                //   // Perform the request. Note the content type - very important

                //   fetch(upload_user_profile_pic_API_URL, {
                //     method: 'POST',
                //     headers: {
                //       'Accept': 'application/json',
                //       'Content-Type': 'multipart/form-data',
                //     },
                //     body: imgBody
                //     }).then(res => res.json()).then(results => {
                //       // Just me assigning the image url to be seen in the view
                //     //   const source = { uri: res.imageUrl, isStatic: true };
                //     //   const images = this.state.images;
                //     //   images[index] = source;
                //     //   this.setState({ images });
                //   }).catch(error => {
                //     console.error(error);
                //   });
                //   const axios_instance = axios.create({
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //     }
                //   });
                
                //  this.setState({loading: true})
                //  console.log("1")
                //  let upload_user_profile_pic_API_Response = await axios_instance.post(upload_user_profile_pic_API_URL, imgBody)
                //   console.log("2")
                //  console.log("here is the upload image api response ", upload_user_profile_pic_API_Response.error)
                //  console.log("here is the upload image api response ", upload_user_profile_pic_API_Response.message)



                // // Imports the Google Cloud client library

                // // Creates a client
                // const storage = new Storage();

                // await storage.bucket("users_profile_pictures").upload(this.state.image, {
                //     // Support for HTTP requests made with `Accept-Encoding: gzip`
                //     gzip: true,
                //     // By setting the option `destination`, you can change the name of the
                //     // object you are uploading to a bucket.
                //     metadata: {
                //       // Enable long-lived HTTP caching headers
                //       // Use only if the contents of the file will never change
                //       // (If the contents will change, use cacheControl: 'no-cache')
                //       cacheControl: 'public, max-age=31536000',
                //     },
                //   });