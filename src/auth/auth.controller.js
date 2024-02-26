import bcryptjs from 'bcryptjs';
import Admin from '../admin/admin.model.js'
import { generateJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Admin.findOne({ mail });
    
        if (!usuario) {
          return res.status(400).json({
            msg: "Incorrect credentials, email does not exist in the database.",
          });
        }

        if (!usuario.state) {
          return res.status(400).json({
            msg: "The user does not exist in the database",
          });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
          return res.status(400).json({
            msg: "Password is incorrect",
          });
        }

        const token = await generateJWT( usuario.id);
    
        res.status(200).json({
          msg: 'Welcome!!!',
          usuario,
          token
        });
    
      } catch (e) {
        console.log(e);
        res.status(500).json({
          msg: "Contact the owner",
        });
      }
}
