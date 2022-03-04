const MP = require("mercadopago");
const successHtml =
  process.env.URL_SERVER + ":" + process.env.PORT_SERVER_FRONT;

MP.configure({
  access_token: process.env.MP_TOKEN,
});

exports.preferences = async (req, res) => {
  const { unit_price } = req.body;

  const { name, surname, email } = req.headers;

  let preference = {
    items: [
      {
        title: `${name}'s cart`,
        quantity: 1,
        unit_price: unit_price,
        currency_id: "ARS",
      },
    ],
    payer: {
      name: name,
      surname: surname,
      email: email,
    },
    back_urls: {
      success: successHtml,
      failure: "",
      pending: "",
    },
    auto_return: "all",
    statement_descriptor: "ParkApp",
  };

  MP.preferences
    .create(preference)
    .then((response) => {
      res.redirect(response.body.init_point);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.view = (req, res) => {
  res.send("sistema index funcionando para las rutas");
};
