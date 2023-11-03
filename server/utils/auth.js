// utils/auth.js
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "thisissomethingsupersecret";
const expiration = "2h";

module.exports = {
	AuthenticationError: new GraphQLError("Could not authenticate user.", {
		extensions: {
			code: "UNAUTHENTICATED",
		},
	}),
	authMiddleware: function ({ req }) {
		// THIS CHUNK OF CODE IS THE ORIGINAL
		let token = req.body.token || req.query.token || req.headers.authorization;

		if (req.headers.authorization) {
			token = token.split(" ").pop().trim();
		}

		if (!token) {
			return req;
		}

		try {
			const { authenticatedPerson } = jwt.verify(token, secret, {
				maxAge: expiration,
			});
			req.user = authenticatedPerson;
		} catch {
			console.log("Invalid token");
		}

		return req;
		// END OF THE CHUNK


		// // THIS CHUNk OF CODE IS FOR TESTING PURPOSES
		// const mockUser = {
		// 	_id: '65451e05ff962b8013b6bb0f',
		// 	userName: 'john_doe',
		// 	email: 'john_doe@example.com',
		// };

		// // Assign the mock user to the request object
		// req.user = mockUser;

		// // Return the modified request
		// return req;
		// // END OF THE CHUNK
	},
	signToken: function ({ email, auth0_id }) {
		const payload = { email, auth0_id };
		return jwt.sign({ authenticatedPerson: payload }, secret, {
			expiresIn: expiration,
		});
	},
};
