export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
    // Min 8 chars, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export const validateRegistration = (data: { name: string; email: string; password: string }) => {
    const errors: string[] = [];
    if (!data.name.trim()) errors.push('Name is required');
    if (!isValidEmail(data.email)) errors.push('Invalid email format');
    if (!isValidPassword(data.password)) errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
    return errors;
};
