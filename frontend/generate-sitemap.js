const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const axios = require('axios');

(async () => {
    const smStream = new SitemapStream({ hostname: 'https://drivexpert.vercel.app' });

    const routes = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/about', changefreq: 'monthly', priority: 0.8 },
        { url: '/contact', changefreq: 'monthly', priority: 0.8 },
        { url: '/careers', changefreq: 'monthly', priority: 0.8 },
        { url: '/faqs', changefreq: 'monthly', priority: 0.8 },
        { url: '/cars', changefreq: 'weekly', priority: 0.9 },
        { url: '/login', changefreq: 'yearly', priority: 0.7 },
        { url: '/register', changefreq: 'yearly', priority: 0.7 },
        { url: '/reset-password', changefreq: 'yearly', priority: 0.7 },
        { url: '/dashboard', changefreq: 'daily', priority: 0.8 },
        { url: '/dashboard/sell-car', changefreq: 'daily', priority: 0.8 },
        { url: '/dashboard/cars-sold', changefreq: 'daily', priority: 0.8 },
    ];

    // Fetch car details dynamically
    try {
        const response = await axios.get('https://drivexpert.onrender.com/api/cars');
        const cars = response.data;
        cars.forEach(car => {
            routes.push({ url: `/cars/${car.id}`, changefreq: 'weekly', priority: 0.9 });
        });
    } catch (error) {
        console.error('Error fetching cars data:', error);
    }

    const writeStream = createWriteStream('./public/sitemap.xml');
    smStream.pipe(writeStream);

    routes.forEach(route => smStream.write(route));
    smStream.end();

    streamToPromise(smStream).then(() => console.log('Sitemap created successfully.'));
})();
