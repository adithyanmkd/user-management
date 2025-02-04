module.exports = {
  isAuthenticated: (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/users/login");
    }
    next();
  },

  preventAuthAccess: (req, res, next) => {
    if (req.session.user) {
      return res.redirect("/");
    }
    next();
  },

  isAdminAuthenticated: (req, res, next) => {
    if (!req.session.admin) {
      return res.redirect("/admin/login");
    }
    next();
  },

  preventAdminAuthAccess: (req, res, next) => {
    if (req.session.admin) {
      return res.redirect("/admin");
    }
    next();
  },
};
