export const hasRole = (...role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'You want to verify a role without validating the token first'
            })
        }

        if (!role.includes(req.user.role)) {
            return res.status(401).json({
                msg: 'Unauthorized user, has a role ${req.usuario.role}, authorized roles are ${ roles }'
            });
        }

        next();
    }
}