![](https://i.ibb.co/5XYr4Lx7/pickem.gif)

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/huseyinfiliz/pickem.svg)](https://packagist.org/packages/huseyinfiliz/pickem) [![Total Downloads](https://img.shields.io/packagist/dt/huseyinfiliz/pickem.svg)](https://packagist.org/packages/huseyinfiliz/pickem)

# Pick'em
A comprehensive sports prediction game extension for [Flarum](https://flarum.org) forums. Engage your community by allowing users to predict match outcomes, compete on a global leaderboard, and track their statistics.

**Credits:** This extension sponsored by [@ernestdefoe ](https://discuss.flarum.org/u/ernestdefoe)& [@KBExit ](https://discuss.flarum.org/u/KBExit)✨

### ⚽ Matches & Predictions
![Matches Demo](https://i.ibb.co/FkqKT9zJ/image.png)

### 🏆 Leaderboard System
![Leaderboard Demo](https://i.ibb.co/WWpWKGpv/image.png)

### 📝 My Picks Dashboard
![My Picks Demo](https://i.ibb.co/qMGPk3kC/image.png)

### ⚙️ Admin Management
![Admin Demo](https://i.ibb.co/1wf6mb4/image.png)

## Features

- 🎯 **Match Predictions**: Users can predict Home Win, Away Win, or Draw results
- 🏆 **Leaderboard**: Automatic global ranking system based on correct predictions
- 📊 **User Statistics**: Track accuracy rates, total points, and correct pick counts
- ⚡ **Live Status**: Real-time match status (Scheduled, Closed, Finished)
- ⏰ **Cutoff Control**: Automatic locking of picks when the match start time is reached
- 📱 **Responsive Design**: Fully optimized card-based layout for mobile devices
- 🔔 **Notifications**: Users receive alerts when match results are announced
- 🛡️ **Admin Panel**: Complete management system for Teams, Seasons, Weeks, and Events
- 🖼️ **Team Logos**: Visual team identity with logo support (URL or Upload)

### Installation

```bash
composer require huseyinfiliz/pickem
```

You can also install with Extension Manager: `huseyinfiliz/pickem`

### Updating

```sh
composer update huseyinfiliz/pickem
```

To remove simply run `composer remove huseyinfiliz/pickem`

## Quick Start

### For Users

1.  Navigate to the **Pick'em** page from the sidebar
2.  Browse the **Matches** tab to see upcoming events
3.  Click on **Home**, **Draw**, or **Away** buttons to make your prediction
4.  Visit **My Picks** to track your history and **Leaderboard** to see your ranking

### For Admins

Navigate to **Admin → Pick'em** to configure the system. The admin panel is divided into tabs for easy management:

#### Teams Tab

  - Create teams with **Name**, **Slug**, and **Logo**
  - Supports direct image upload (requires FoF Upload) or external image URLs

#### Seasons Tab

  - Create seasons (e.g., "2024-2025 Season")
  - Define start and end dates for organizational purposes

#### Weeks Tab

  - Group matches into weeks (e.g., "Week 1", "Playoffs")
  - Link weeks to specific seasons

#### Matches Tab

  - Create matches by selecting Home and Away teams
  - **Match Date**: When the game actually starts
  - **Cutoff Date**: The deadline for users to make picks (usually match start time)
  - **Allow Draw**: Toggle whether a "Draw" option is available for prediction
  - **Status**: Manually manage statuses (Scheduled, Closed, Finished)
  - **Enter Results**: Input scores after the match to automatically calculate points

#### Settings Tab

  - **Recalculate Scores**: A utility tool to recalculate all user scores and rankings from scratch if needed

### 🎯 Use Cases

#### Sports Communities

  - Football/Soccer leagues (Premier League, La Liga, etc.)
  - Basketball tournaments (NBA, EuroLeague)
  - Weekly NFL pick'em pools

#### E-Sports Forums

  - Tournament prediction brackets for games like LoL, CS:GO, or Valorant
  - Team performance tracking

### TV & Events

  - Reality show elimination predictions
  - Award show winners (Oscars, Grammys) pools

### 🔧 Advanced Details

#### Scoring System

  - **Points**: Users earn **1 point** for every correct prediction.
  - **Accuracy**: Calculated as `(Correct Picks / Total Picks) * 100`.
  - **Ranking**: The leaderboard is sorted by Total Points (primary) and Correct Pick count (secondary).

#### Permissions

You can configure permissions via the Flarum Permission grid:

  - **Manage pick'em system**: Allows full access to the admin panel (create/edit/delete data).
  - **Make picks**: Allows users to participate in the game.
  - **View Pick'em page**: Controls visibility of the extension page.

#### Automated Logic

  - **Result Calculation**: When an admin enters the score, the system automatically determines the winner (Home/Away/Draw).
  - **Status Updates**: Matches are automatically marked as "Finished" when results are saved.
  - **Notifications**: Users who predicted a match receive a notification when the result is entered.

#### Week Reminders

Registered users receive an in-app alert once per week when its first match kicks off within the next 24 hours and at least one match is still open for predictions. Notification preferences are respected. Timing uses the earliest match's `match_date`, not the week's `start_date`; imported weeks with an empty start date are supported. Weeks without matches or whose first match has already started are skipped.

After updating the extension, run `php flarum migrate` and `php flarum cache:clear` from the forum root. Reminders are scheduled daily at 08:00 in the scheduler's timezone. Enable Flarum's scheduler with a cron entry (replace the paths for your installation):

```cron
* * * * * cd /path/to/forum && /usr/bin/php flarum schedule:run >> /path/to/forum/storage/logs/scheduler.log 2>&1
```

Alternatively, run the reminder command directly from a daily cron job instead of enabling the scheduler:

```cron
0 8 * * * cd /path/to/forum && /usr/bin/php flarum bragalotto:send-week-reminders >> /path/to/forum/storage/logs/week-reminders.log 2>&1
```

Run `php flarum bragalotto:send-week-reminders` to process reminders manually. Delivery is batched and progress is saved per week, so repeated or interrupted runs do not resend completed batches. Alerts are written by the command itself. Realtime updates, push (`fof/pwa`) and email opt-ins are queued, so those need a running queue worker. Run the command more frequently if match schedules are imported less than a day before kickoff.

#### 🌍 Translations

This extension comes with English translations. Community translations are welcome!
[![Translate](https://weblate.rob006.net/widgets/flarum/-/huseyinfiliz-pickem/multi-auto.svg)](https://weblate.rob006.net/projects/flarum/huseyinfiliz-pickem/)

#### 💖 Support & Contributing

If you find this extension useful, consider:

  - ⭐ Starring the repository on GitHub
  - 💬 Leaving feedback on the [Flarum discussion](https://discuss.flarum.org/d/38433-pickem-match-prediction-extension)