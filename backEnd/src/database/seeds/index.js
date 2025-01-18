import dbConnection from '../config/config.js';
import seedUsers from './users.js';

dbConnection().then(async () => {
    try {
        await seedUsers();
        console.log('Seeding completed!');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        process.exit();
    }
});
