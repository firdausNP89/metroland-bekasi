import { getByToken } from "../services/user.service.js";
import db_write from "../config/Database.js";

export const doLogout = async (req, res) => {
  const cookie = req.cookies.mpvAdmRef;
  if (!cookie) return res.sendStatus(204);
  const user = await getByToken(cookie);

  if (!user) return res.sendStatus(204);
  await db_write.users.update(
    {
      token: null,
    },
    {
      where: {
        uuid: user.uuid,
      },
    }
  );
  res.clearCookie(process.env.COOKIE);
  res.clearCookie("mpvAdmAcc");
  res.clearCookie("_csrf");
  res.redirect("/admin/login");
};
