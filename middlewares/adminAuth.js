//Kod för att hantera Admin-login
export function authorizeUser(requiredRole) {
    return (req, res, next) => {
        const user = global.user; // Hämta användaren från globalt scope

        if (user) {
            if (!requiredRole || user.role === requiredRole) {
                return next();
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'You do not have the required permissions!'
                });
            }
        } else {
            return res.status(403).json({
                success: false,
                message: 'You must log in!'
            });
        }
    };
}