const cors = require('cors');
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;

class Server {
    // server class that runs on port 3001 and contains the paths to the diffren queries
    constructor() {
        this.app = express();
        this.port = PORT;
        this.paths = {
            homepage: "/api/homepage",
            profile: "/api/profile",
            checkout: "/api/checkout",
            signin: "/api/signinpage",
            signup: "/api/signuppage",
            orders: "/api/orderspage",
            gennerated: "/api/genneratedpage",
            savedimages: "/api/savedimagespage",
            sharedimages: "/api/sharedimagespage",
            explore: "/api/explorepage",
        };

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' })); // 50 mb limit to payload
        this.app.use(
            express.static(path.join(__dirname, "../public")) // for GCP deployment
        );
    }

    routes() {
        this.app.use(this.paths.homepage, require("./routes/homepage"));
        this.app.use(this.paths.profile, require("./routes/profile"));
        this.app.use(this.paths.checkout, require("./routes/checkout"));
        this.app.use(this.paths.signin, require("./routes/signinpage"));
        this.app.use(this.paths.signup, require("./routes/signuppage"));
        this.app.use(this.paths.orders, require("./routes/orderspage"));
        this.app.use(this.paths.gennerated, require("./routes/genneratedpage"));
        this.app.use(this.paths.savedimages, require("./routes/savedimagespage"));
        this.app.use(this.paths.sharedimages, require("./routes/sharedimagespage"));
        this.app.use(this.paths.explore, require("./routes/explorepage"));

        this.app.get("*", (req, res) => {
            res.sendFile(
                path.join(__dirname, "../client/build/index.html")
            );
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port: ", this.port);
        });
    }
}

module.exports = Server;
