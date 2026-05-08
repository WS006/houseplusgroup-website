/**
 * LinkedIn Auto-poster
 *
 * Posts latest product or article to LinkedIn.
 * Requires: LINKEDIN_ACCESS_TOKEN, LINKEDIN_PERSON_ID
 *
 * Usage: node scripts/linkedin-poster.js
 */

const https = require('https');

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_PERSON_ID = process.env.LINKEDIN_PERSON_ID;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://houseplus-ch.com';

const POSTS = [
  {
    text: `Looking for a reliable wholesale supplier for home appliances and solar systems?\n\nHousePlus offers OEM/ODM services with competitive MOQ, CE/FCC/RoHS certifications, and fast delivery to Africa, Middle East, and Southeast Asia.\n\nBrowse our catalog: ${SITE_URL}/en/products\n\n#Wholesale #SolarEnergy #HomeAppliances #B2B #OEM #ODM #HousePlus`,
  },
  {
    text: `Solar power is transforming energy access across Africa. At HousePlus, we supply portable power stations (300W-3000W), solar panels, and complete home systems for wholesale buyers.\n\nMOQ starts from 100 units. Get your quote today: ${SITE_URL}/en/contact\n\n#SolarEnergy #CleanEnergy #Africa #Wholesale #PowerStation`,
  },
  {
    text: `New product alert! Our latest portable power station lineup delivers reliable off-grid power for homes and businesses.\n\nKey features:\n- Multiple output ports (AC, DC, USB-C)\n- Fast charging support\n- CE & FCC certified\n- OEM/ODM available\n\nLearn more: ${SITE_URL}/en/products\n\n#PowerStation #SolarPower #OEM #HousePlus`,
  },
];

function postToLinkedIn(postContent) {
  return new Promise((resolve, reject) => {
    if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_PERSON_ID) {
      reject(new Error('LINKEDIN_ACCESS_TOKEN and LINKEDIN_PERSON_ID are required'));
      return;
    }

    const postData = JSON.stringify({
      author: `urn:li:person:${LINKEDIN_PERSON_ID}`,
      commentary: postContent,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
    });

    const options = {
      hostname: 'api.linkedin.com',
      path: '/v2/ugcPosts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': '202401',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`LinkedIn API error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  // Rotate posts — pick based on day of week
  const dayIndex = new Date().getDay() % POSTS.length;
  const post = POSTS[dayIndex];

  console.log('Posting to LinkedIn...');
  try {
    const result = await postToLinkedIn(post.text);
    console.log('Post published successfully');
    console.log('Post ID:', result.id);
  } catch (err) {
    console.error('Failed to post:', err.message);
    if (err.message.includes('401')) {
      console.error('Token may have expired. Regenerate at LinkedIn Developer Portal.');
    }
    process.exit(1);
  }
}

main();
