import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '../public/reviews-data.json');

// Google Maps short URL for Andrez Reykjavik
const SHORT_URL = 'https://maps.app.goo.gl/KH9D7vbmQKSd7YmFA';

async function updateReviews() {
        console.log('Resolving Google Maps rating...');
        try {
                const response = await fetch(SHORT_URL, {
                        headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                                'Accept-Language': 'en-US,en;q=0.9'
                        }
                });

                if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                }

                const html = await response.text();

                // Regex matching standard schema markup
                const ratingMatch = html.match(/itemprop="ratingValue"\s+content="([0-9.]+)"/i) || 
                                    html.match(/meta\s+itemprop="ratingValue"\s+content="([0-9.]+)"/i) ||
                                    html.match(/"ratingValue":\s*([0-9.]+)/i) ||
                                    html.match(/\\u0022ratingValue\\u0022,\s*([0-9.]+)/i);

                const reviewsMatch = html.match(/itemprop="reviewCount"\s+content="([0-9]+)"/i) ||
                                     html.match(/meta\s+itemprop="reviewCount"\s+content="([0-9]+)"/i) ||
                                     html.match(/"reviewCount":\s*([0-9]+)/i) ||
                                     html.match(/\\u0022reviewCount\\u0022,\s*([0-9]+)/i) ||
                                     html.match(/itemprop="ratingCount"\s+content="([0-9]+)"/i) ||
                                     html.match(/"ratingCount":\s*([0-9]+)/i);

                let rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
                let reviewsCount = reviewsMatch ? parseInt(reviewsMatch[1], 10) : null;

                // Fallback: If scraping fails, look for specific patterns or fallback to current data
                if (!rating || !reviewsCount) {
                        console.log('Using fallback parser...');
                        const namePattern = /"Andrez"[^]*?([345]\.[0-9])[^]*?([0-9]{2,4})/g;
                        const match = namePattern.exec(html);
                        if (match) {
                                if (!rating) rating = parseFloat(match[1]);
                                if (!reviewsCount) reviewsCount = parseInt(match[2], 10);
                        }
                }

                // If still not found, load existing JSON or use fallback defaults
                if (!rating || !reviewsCount) {
                        console.log('Metadata parsing failed. Keeping current values to prevent empty data.');
                        let currentData = { rating: 4.7, reviewsCount: 58 };
                        if (fs.existsSync(jsonPath)) {
                                try {
                                        currentData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                                } catch (e) {
                                        console.error('Error reading current JSON:', e);
                                }
                        }
                        rating = rating || currentData.rating;
                        reviewsCount = reviewsCount || currentData.reviewsCount;
                }

                console.log(`Rating updated: ${rating} | Reviews: ${reviewsCount}`);

                const newData = {
                        rating,
                        reviewsCount
                };

                fs.writeFileSync(jsonPath, JSON.stringify(newData, null, 2));
                console.log('reviews-data.json updated successfully!');

        } catch (error) {
                console.error('Failed to run update script:', error);
                process.exit(1);
        }
}

updateReviews();
