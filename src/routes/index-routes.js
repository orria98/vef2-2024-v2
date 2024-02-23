import express from 'express';
import { getDatabase } from '../lib/db.js';
import { getGames } from '../lib/db.js';
import { calculateStandings } from '../lib/score.js';

export const indexRouter = express.Router();

async function indexRoute(req, res) {
  const user = req.user ?? null;
  const loggedIn = req.isAuthenticated();
  const games = await getGames(5); // call getGames directly
  const allGames = await getGames(); // call getGames directly

  const standings = allGames ? calculateStandings(allGames) : null;
  return res.render('index', {
    title: 'Forsíða',
    time: new Date().toISOString(),
  });
}

async function leikirRoute(req, res) {
  const games = await getGames();

  return res.render('leikir', {
    title: 'Leikir',
    games,
    time: new Date().toISOString(),
  });
}

async function stadaRoute(req, res) {
  return res.render('stada', {
    title: 'Staðan',
  });
}

indexRouter.get('/', indexRoute);
indexRouter.get('/leikir', leikirRoute);
indexRouter.get('/stada', stadaRoute);
