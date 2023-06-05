import express from "express";
import {GoogleSpreadsheet} from "google-spreadsheet"

const app = express();
const port = 9000;




const add = async (phone) => {
  const client_email = "gazstroi@beaming-opus-337504.iam.gserviceaccount.com"

  const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqV6KWhXbtlajY\nIUa7inKZ0bs27+Hp+gNwuGg8nrohPdjEVkSBb/NXhU0udEYdD6WBSPKZj/WRPmXI\nw0QiGoTknomFBM8Lc2ZHfl5GMCsgKCheZ7izgQZR0/oCIfGezOMi2T43eZGDiRJr\nGDpGtT19rwCF0Nsti9XBent4y8El/LMvtgXVp9rGbf1bOeO5Ddg67WfPzeQnSIsq\nkqA86L59yGWwwuGunCdDq02zSt6J6mbGGPi7W74/cg8HPF1Smy2g2XVvC2rb1ZD0\nVxR0j3fuAYuexa077F1Rp1b6ycDKKeNgZMhizIc5JkVW45lVMdBktnwNxIETzXcN\nsgS3KGprAgMBAAECggEATbDTkGhF4j1weUbQDmgqNZqxEvDcrkzftdD9hax1QwUE\nsSORciGfsGq1VXsloUqKF0mwkDZW74wwex0IHa/Prb/bA+a6EcRrwS7TC5sbiDqY\nktompQQzYC3YqJFXtLBI5hOEK2QQaJgjZOHzbl1qMsEW8XFdDcxpzSkyWFlB+jMk\nnflyJXQamOWJmr6As2LdaT6oZui0ZGOU3h+WBUid0YtG87iNul4H4EPPNIEFdRsk\nrGMM7Xf91eHyQd/5f31a0D8QQ1E6GwCFaAS2JHh/5XaHTV8cS6NF2IW14m4M7Sg+\nycUR+HOzygN9z7RP6wgLdQP00D+eGDwxYCvwgGRfSQKBgQDefojGznmP2i2RUf29\nASwCxGriKMXqUShXocZROzJlUpid++A5cYl97M6d0jwWAg00SYWompAp2ap1K0L2\n89In5ZW3iVBOksVkQHe2NDvtmN/HB2C/6s2gQyGQKpP23TKxsq+fuVInlzG+HHZz\nYK5avpR+rDxoUGOTBH6+8a+i6QKBgQDD/pH15D1LCdmIAFgQUHOHI4bjhi0sdOev\nhbGdpvXvbci7HvU0SZitnEoTBBJ4gIcRuyeu7wgGpnywiRsCKRhWJMOryd/or6Cc\n7a66fHG8aPjxSVzsBplVDejjC5j6AE/Bt78fJp48WVRNpZOySqgRq25DYt9hPhLD\nH5TGUZ2GMwKBgDEGvsrX6m9pSwsvfvLr1C/T6h1lkJ7ePT56FkIGAkfTWG/PdYwS\n2ZIW4Txje/v5fcFcxgft7wBZxzbETqAt/8vsyf3EUx7NNpOtpPNQNThYrE6l8Iq5\niY/b2wRybWJDQY1oa0yNwG2a4koa6Xro/eJfBkeXWkQ+GoLlxav7g5EpAoGAX+Mp\nB9LtRcwA1+/LJdgmXUQ9Vw0rBqf/Pbk753RquAPPA/UmY7lp7+4Zs2n3m2rOKheV\nV5lsJMzJDhlV1F3EoUiFToOKfy2Fd6E1Ldl6T4JP4MRSqMqls54FhScEZbNHUfAS\nmivrmHzfqMlMFBtAVLy5SlCSFuImjb3irI/7cE8CgYEAucNy91uDqGqd44zB7Lwx\no6OZmCPWLeSPiDU8HgEIZbmiGMmsz8Caj9uxgwT6T9ZGbslIL6pEKEiUsVy8zGOc\n2q78c7etRqI1fSR6BxB4hiIWrcaKe7TWxTNvybErwuF8Go5z5B9nkChUjxeTN5BH\nhmwxUW1eXBoo1Hm1cFW266w=\n-----END PRIVATE KEY-----\n"




  const doc = new GoogleSpreadsheet("1-1uNJ4_Nqk5ow1naFTQGusSF5seOf4QpWj3tFdPVzkw")


  await doc.useServiceAccountAuth({client_email, private_key: private_key})
  await doc.loadInfo()

  const sheet = doc.sheetsByIndex[0]

  const rows = await sheet.getRows()

  const currentDate = new Date();

  sheet.addRow({"Дата": currentDate, "Номер": phone})
}



app.use("/phone", (req, res) => {
  const phoneNumber = req.query.number;
  console.log(phoneNumber)
  add(phoneNumber)
});


app.get('/phone', (req, res) => {
  const phoneNumber = req.query.number;
  console.log(phoneNumber)
  add(phoneNumber)
});

app.listen(9000, () => {
  console.log(`Starting Server on Port ${port}`);
});
