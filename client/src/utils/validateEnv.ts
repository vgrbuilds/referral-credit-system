export const validateEnv = () => {
    const requiredEnvVars = ['NEXT_PUBLIC_API_URL'];
    const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

    if (missingVars.length > 0) {
        console.error(
            `Missing required environment variables: ${missingVars.join(', ')}. ` +
            `Please check your .env.local file.`
        );
        // In development, we might want to throw to make it obvious
        if (process.env.NODE_ENV === 'development') {
            throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
        }
    }
};
