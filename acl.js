const redis = require('./../adapters/redis');
const node_acl = require('acl');
const acl = new node_acl(new node_acl.redisBackend(redis, '_acl'));

module.exports = (req, res, next) => {
    if (req.user) {
        acl.allowedPermissions(req.user.user._id.toString(), [req.originalUrl], (err, permission) => {
            console.log(permission);
        });
        acl.isAllowed(
            req.user.user._id.toString(),
            req.originalUrl, req.method, (error, allowed) => {
                if (allowed) next()
                else {
                    res.send({ message: 'Insufficient permissions to access resource' });
                }
            }
        )
    } else {
        res.send({ message: 'User not authenticated' });
    }
}