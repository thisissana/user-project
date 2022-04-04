const userRepository = require("../repositories/userRepository");

const alreadyExists = (e) =>
  e.message && e.message.indexOf("duplicate key") > -1;

const hasErrors = (e) => e._message === "user validation failed";

const handleErrors = (e, res) => {
  if (alreadyExists(e)) res.status(409).send("User already exists");
  else if (hasErrors(e)) res.status(400).json(e.errors);
  else res.status(500).send(e);
};

const register = async (req, res) => {
  try {
    const data = req.body;
    await userRepository.add(data);
    res.status(201);
    res.send();
  } catch (e) {
    if (e._message === "user validation failed") {
      res.status(400);
      res.json(e.errors);
    } else {
      res.status(500);
      res.send("Internal Server Error");
    }
  }
};

const signin = async (req, res) => {
  const data = req.body;
  const email = req.body.email;
  const dbUser = await userRepository.getUser(email);
  if (!dbUser) {
    res.status(401).send("Unauthorized");
    return;
  } else {
    const response = {
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      email: dbUser.email,
    };
    res.status(200).send(response);
  }
};

const getUsers = async (req, res) => {
  //const data = req.body();
  try {
    const users = await userRepository.getUsers();

    res.status(200);
    res.json(users);
  } catch (e) {
    res.status(500).send("Interval Server Error");
  }
};

const deleteUsers = async (req, res) => {
  try {
    const email = req.params.email;
    await userRepository.deleteUsers({ email: email });
    res.status(204).send("Successfully Deleted");
  } catch (e) {
    console.log(e);

    res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    const email = req.params.email;
    await userRepository.updateUser(email, req.body);

    res.status(204);
    res.send();
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  getUsers,
  deleteUsers,
  signin,
  handleErrors,
  update,
};
