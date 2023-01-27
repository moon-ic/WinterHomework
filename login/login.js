let phoneLetter = document.querySelector("#phoneLetter");
        let loginPhone = document.querySelector("#loginPhone");
        phoneLetter.onclick = () => {
            phoneLetter.style.color = "#000";
            let data = {
                phone: `${loginPhone.value}`,
            }
            fetch("http://why.vin:2023/captcha/sent", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
        }