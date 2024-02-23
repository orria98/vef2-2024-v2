/**
 * Reiknar út stöðu deildarinnar út frá leikjunum
 * @param {Array} data - Upplýsingar um leikina
 * @returns {Object} - Stöðutaflan
 */
import { teams } from '../generate.js';
export function calculateStandings(data) {
  const standings = {};

  for (const { games } of data) {
    for (const { home, away } of games) {
      if (!teams.includes(home.name) || !teams.includes(away.name)) {
        continue;
      }

      if (typeof home.name !== 'string' || typeof away.name !== 'string') {
        continue;
      }

      if (!(home.name in standings)) {
        standings[home.name] = 0;
      }
      if (!(away.name in standings)) {
        standings[away.name] = 0;
      }

      if (home.score > away.score) {
        standings[home.name] += 3;
      } else if (home.score < away.score) {
        standings[away.name] += 3;
      } else {
        standings[home.name] += 1;
        standings[away.name] += 1;
      }
    }
  }

  const sortedStandings = Object.fromEntries(
    Object.entries(standings).sort(([, aScore], [, bScore]) => bScore - aScore)
  );

  return sortedStandings;
}
