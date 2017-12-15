 let promise = new Promise((resolve, reject) => {
                let response = user.comparePassword(password, user.password);
                console.log('1:promise:response:before', response);
                resolve(response);
                console.log('2:promise:response:resolve', response);
            });

            promise.then(response => {
                console.log('3:then:response', response);
                if (response) {
                    res.send({ user: user });
                } else {
                    res.status(422).send({ error: "Incorret password!" });
                }
            });