// created at regexr.com
const nameRegex = /\b([A-ZÀ-ÿa-z][a-z]*)+/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

export { nameRegex, emailRegex, passRegex };
