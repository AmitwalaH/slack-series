
import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    if (!isSignInPage(request) && !(await convexAuth.isAuthenticated())) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }

    //TODO : redirect the user away from "/auth" if authenticated
    if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
        return nextjsMiddlewareRedirect(request, "/");
    }
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};



// -------------------------------------------------------------------------------------------------
// import {
//     convexAuthNextjsMiddleware,
//     createRouteMatcher,
//     isAuthenticatedNextjs,
//     nextjsMiddlewareRedirect,
// } from "@convex-dev/auth/nextjs/server";

// const isPublicPage = createRouteMatcher(["/signin"]);

// export default convexAuthNextjsMiddleware((request) => {
//     if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
//         return nextjsMiddlewareRedirect(request, "/signin");
//     }
//     //TODO : redirect the user away from "/signin" if authenticated
// });

// export const config = {
//     // The following matcher runs middleware on all routes
//     // except static assets.
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// ------------------------------------------------------------------------------------------------
// import {
//     convexAuthNextjsMiddleware,
//     createRouteMatcher,
//     isAuthenticatedNextjs,
//     nextjsMiddlewareRedirect,
// } from "@convex-dev/auth/nextjs/server";

// const isPublicPage = createRouteMatcher(["/signin"]);

// export default convexAuthNextjsMiddleware((request) => {
//     const isLoggedIn = request.cookies.get("token"); // Check if token exists

//     if (!isPublicPage(request) && !isLoggedIn) {
//         return nextjsMiddlewareRedirect(request, "/signin"); // Redirect to signin if not authenticated
//     }

//     return null; // Continue to the requested page if authenticated
// });

// export const config = {
//     // Runs middleware on all routes except static assets.
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };