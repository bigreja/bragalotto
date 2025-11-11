# Pick'em Extension for Flarum

A comprehensive pick'em game extension for Flarum 1.x that allows users to predict match outcomes and compete on a leaderboard.

## Features

### Admin Features
- **Team Management**: Create and manage teams with names, slugs, and logo uploads
- **Season Management**: Create seasons to organize matches into time periods
- **Week Management**: Create weeks and optionally link them to seasons
- **Match Management**: Create matches (events) with:
  - Home and away teams
  - Match date/time
  - Pick cutoff date/time
  - **Allow draw** toggle per match
  - Status (scheduled, closed, finished)
- **Result Entry**: Enter match scores (home and away)
- **Automatic Calculation**: System automatically determines results and awards points

### User Features
- **Make Picks**: Users can pick one outcome per match before cutoff:
  - Home win
  - Away win
  - Draw (if allowed for that match)
- **View Matches**: Browse all scheduled matches with pick buttons
- **My Picks**: View all personal picks with results
- **Leaderboard**: See rankings with optional season filter
- **Notifications**: Receive Flarum Alerts when results are posted

### Technical Features
- **Server Validation**:
  - No picks after cutoff time
  - No duplicate picks per user per match
  - Draw picks only allowed if match permits
- **Automatic Scoring**:
  - +1 point for correct predictions
  - Cached user scores for performance
  - Result calculation: equal scores = draw
- **JSON API**: RESTful API following Flarum conventions
- **Mithril Frontend**: Modern reactive UI components
- **Database Migrations**: Proper schema management

## Installation

```bash
composer require huseyinfiliz/pickem
```

Then enable the extension in your Flarum admin panel.

## Database Schema

### Tables

1. **pickem_teams**: Team information
   - id, name, slug, logo_path

2. **pickem_seasons**: Season organization
   - id, name, slug, start_date, end_date

3. **pickem_weeks**: Week grouping
   - id, name, season_id, week_number, start_date, end_date

4. **pickem_events**: Matches/Events
   - id, week_id, home_team_id, away_team_id
   - match_date, cutoff_date
   - **allow_draw** (boolean)
   - status, home_score, away_score, result

5. **pickem_picks**: User predictions
   - id, user_id, event_id
   - **selected_outcome** (home|away|draw)
   - is_correct

6. **pickem_user_scores**: Cached scores
   - id, user_id, season_id
   - total_points, total_picks, correct_picks

## API Endpoints

### Teams
- `GET /api/pickem/teams` - List all teams
- `POST /api/pickem/teams` - Create team (admin)
- `PATCH /api/pickem/teams/{id}` - Update team (admin)
- `DELETE /api/pickem/teams/{id}` - Delete team (admin)

### Seasons
- `GET /api/pickem/seasons` - List all seasons
- `POST /api/pickem/seasons` - Create season (admin)

### Weeks
- `GET /api/pickem/weeks` - List all weeks
- `POST /api/pickem/weeks` - Create week (admin)

### Events
- `GET /api/pickem/events` - List all events
- `POST /api/pickem/events` - Create event (admin)
- `PATCH /api/pickem/events/{id}` - Update event/enter result (admin)

### Picks
- `GET /api/pickem/picks` - List user's picks
- `POST /api/pickem/picks` - Create/update pick

Example pick creation:
```json
POST /api/pickem/picks
{
  "data": {
    "attributes": {
      "eventId": 1,
      "selectedOutcome": "home"
    }
  }
}
```

### Leaderboard
- `GET /api/pickem/leaderboard` - Get leaderboard
  - Optional filter: `?filter[season]=1`

## Usage Guide

### For Administrators

1. **Create Teams**:
   - Go to Admin → Pick'em → Teams
   - Click "Create Team"
   - Enter name, slug, and optional logo path
   - Save

2. **Create Season** (Optional):
   - Go to Seasons tab
   - Create a season to organize matches

3. **Create Weeks** (Optional):
   - Go to Weeks tab
   - Create weeks and link to seasons

4. **Create Matches**:
   - Go to Events tab
   - Click "Create Event"
   - Select home and away teams
   - Set match date and cutoff date
   - **Toggle "Allow Draw"** if draws are possible
   - Save

5. **Enter Results**:
   - Find the match in Events tab
   - Click "Enter Result"
   - Enter home and away scores
   - System automatically:
     - Determines the result (home/away/draw)
     - Marks picks as correct/incorrect
     - Updates user scores
     - Sends notifications

### For Users

1. **Make Picks**:
   - Navigate to "Matches" page
   - See all upcoming matches
   - Click your prediction (Home/Draw/Away)
   - Can change pick before cutoff

2. **View Your Picks**:
   - Navigate to "My Picks" page
   - See all your predictions
   - Check which were correct

3. **Check Leaderboard**:
   - Navigate to "Leaderboard" page
   - See rankings by points
   - Filter by season (optional)

## Validation Rules

1. **Pick Submission**:
   - Must be before cutoff date
   - Must be valid outcome (home/away/draw)
   - Draw only if `allow_draw` is true for that match
   - One pick per user per match (updates allowed)

2. **Result Entry**:
   - Only admins can enter results
   - System calculates: home_score > away_score = home win
   - System calculates: away_score > home_score = away win
   - System calculates: home_score == away_score = draw

3. **Scoring**:
   - Correct pick = +1 point
   - Incorrect pick = 0 points
   - Scores cached per user per season

## Customization

### Translations
Edit `/resources/locale/en/pickem.yml` to customize text.

### Styling
- Forum styles: `/resources/less/forum.less`
- Admin styles: `/resources/less/admin.less`

### Point System
To change the point system, edit `UpdateUserScoresListener.php`:
```php
$userScore->total_points = $userScore->correct_picks; // Currently 1 point per correct pick
```

## Development

```bash
# Install dependencies
composer install
cd js
npm install

# Build frontend
npm run build

# Watch for changes
npm run dev
```

## Code Structure

```
pickem/
├── extend.php                 # Main extension configuration
├── composer.json             # Package definition
├── src/
│   ├── Team.php             # Team model
│   ├── Season.php           # Season model
│   ├── Week.php             # Week model
│   ├── Event.php            # Match/Event model
│   ├── Pick.php             # User pick model
│   ├── UserScore.php        # Cached score model
│   ├── Api/
│   │   ├── Controller/      # API controllers
│   │   └── Serializer/      # JSON API serializers
│   ├── Listener/            # Event listeners
│   └── Notification/        # Notification blueprints
├── migrations/              # Database migrations
├── js/
│   └── src/
│       ├── admin/          # Admin panel components
│       └── forum/          # User-facing components
└── resources/
    ├── locale/             # Translations
    └── less/               # Styles
```

## License

MIT License

## Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.

## Credits

Developed by Huseyin Filiz for Flarum 1.x

---

**Note**: This extension follows Flarum 1.x conventions and best practices. All API endpoints follow JSON:API specification, and frontend components use Mithril.js as per Flarum standards.
