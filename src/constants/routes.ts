export const ROUTES = {

    ROOT: "/",
    
    LANDING: "/landing",
    
    LOGIN: "/login",
    
    SIGNUP: "/signup",
    
    VERIFY_OTP: "/verify-otp",
    
    FEED: "/feed",
    
    FORGOT_PASSWORD: "/forgot-password",
    
    VERIFY_PASSWORD_RESET_OTP: "/verify-password-reset-otp",
    
    RESET_PASSWORD: "/reset-password",

    
    ADMIN: {
    
        ROOT: "/admin",
    
        LOGIN: "login",
    
        USERS: "users",
    
        DASHBOARD: "dashboard",
    
        CATEGORY_CONFIGURATIONS: "catalog/category-configurations",
    
        CATEGORY_CONFIGURATION: "catalog/category-configuration/:draftId",
    
    },

} as const;