# Pick'em Extension for Flarum

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Flarum](https://img.shields.io/badge/flarum-%5E1.8.0-orange.svg)

A comprehensive pick'em game extension for Flarum 1.8+ that allows users to predict match outcomes and compete on a leaderboard.

## 🎯 Features

### 👤 User Features
- **Make Predictions**: Pick home win, away win, or draw for upcoming matches
- **Real-time Updates**: Change picks before cutoff time
- **Personal Dashboard**: View all your picks with results and statistics
- **Leaderboard**: Compete with other users and track your ranking
- **Statistics**: Track accuracy, total picks, and points earned
- **Notifications**: Receive alerts when match results are announced
- **Responsive Design**: Works seamlessly on desktop and mobile

### 🛠️ Admin Features
- **Team Management**: Create and manage teams with logos
- **Season Organization**: Organize matches into seasons
- **Week Grouping**: Group matches by weeks within seasons
- **Match Management**: 
  - Set match and cutoff dates
  - Configure draw allowance per match
  - Enter results easily
  - View pick statistics
- **Flexible Scoring**: Configure points per correct pick
- **Status Management**: Track scheduled, closed, finished, and cancelled events
- **Automatic Processing**: Results and scores update automatically

### 🔧 Technical Features
- **Validation**: Server-side validation prevents invalid picks
- **Permissions**: Granular permission system for different user roles
- **Event System**: Eloquent events for automatic score updates
- **Caching**: User scores cached for performance
- **API**: RESTful JSON:API endpoints
- **Modern Frontend**: Mithril.js components
- **Extensible**: Policy-based authorization system
- **Console Commands**: Cron job support for automated tasks
- **Multi-language**: English and Turkish translations included

## 📦 Installation

```bash
composer require huseyinfiliz/pickem
```

Enable the extension in your Flarum admin panel.

## 🚀 Quick Start

### For Administrators

1. **Create Teams**:
   - Navigate to Admin → Pick'em → Teams
   - Add teams with names and logos

2. **Create a Season** (Optional):
   - Navigate to Admin → Pick'em → Seasons
   - Set season name and date range

3. **Create Matches**:
   - Navigate to Admin → Pick'em → Matches
   - Select home and away teams
   - Set match date and cutoff time
   - Choose whether to allow draw picks

4. **Enter Results**:
   - Edit the match after it's finished
   - Enter home and away scores
   - System automatically calculates results and updates scores

### For Users

1. **View Matches**:
   - Navigate to Pick'em → Matches
   - See all upcoming matches with cutoff times

2. **Make Picks**:
   - Click on your prediction (Home/Draw/Away)
   - Change your pick anytime before cutoff

3. **Track Performance**:
   - View your picks: Pick'em → My Picks
   - Check leaderboard: Pick'em → Leaderboard

## ⚙️ Configuration

### Settings

Access settings in Admin → Pick'em → Settings:

- **Points per correct pick**: Default is 1 point
- **Enable notifications**: Send alerts when results are announced
- **Show other picks after cutoff**: Allow users to see others' picks after deadline

### Permissions

Configure in Admin → Permissions:

- **Manage pick'em system**: Admin-only access (Moderate)
- **Make picks**: Allow users to make predictions (Start)
- **View leaderboard**: Allow viewing the leaderboard (View)

## 🔄 Automated Tasks

Set up cron jobs for automatic maintenance:

```bash
# Close expired events (runs every 15 minutes)
*/15 * * * * php /path/to/flarum pickem:close-expired

# Recalculate all scores (runs daily at 3am)
0 3 * * * php /path/to/flarum pickem:update-scores --all
```

## 🗄️ Database Schema

### Tables

1. **pickem_teams**: Team information
   - `id`, `name`, `slug`, `logo_path`, `created_at`, `updated_at`

2. **pickem_seasons**: Season organization
   - `id`, `name`, `slug`, `start_date`, `end_date`, `created_at`, `updated_at`

3. **pickem_weeks**: Week grouping
   - `id`, `name`, `season_id`, `week_number`, `start_date`, `end_date`, `created_at`, `updated_at`

4. **pickem_events**: Matches/Events
   - `id`, `week_id`, `home_team_id`, `away_team_id`
   - `match_date`, `cutoff_date`, `allow_draw`
   - `status` (scheduled|closed|finished|cancelled)
   - `home_score`, `away_score`, `result` (home|away|draw)
   - `created_at`, `updated_at`

5. **pickem_picks**: User predictions
   - `id`, `user_id`, `event_id`
   - `selected_outcome` (home|away|draw)
   - `is_correct` (boolean|null)
   - `created_at`, `updated_at`

6. **pickem_user_scores**: Cached user scores
   - `id`, `user_id`, `season_id`
   - `total_points`, `total_picks`, `correct_picks`, `accuracy`
   - `created_at`, `updated_at`

## 🏗️ Architecture

### Models
- **Event**: Match model with automatic result calculation
- **Pick**: User prediction with correctness checking
- **UserScore**: Cached score with automatic accuracy calculation
- **Team, Season, Week**: Organizational models

### Controllers
All follow Flarum's AbstractController patterns:
- List, Create, Update, Delete for each resource
- Proper validation and error handling
- Permission checks built-in

### Validators
- **PickValidator**: Validates pick creation
- **EventValidator**: Validates event creation/updates

### Policies
- **EventPolicy**: Event authorization
- **PickPolicy**: Pick authorization
- **PickemPolicy**: General system authorization

### Listeners
- **EventSavedListener**: Handles result notifications
- **UpdateUserScoresListener**: Recalculates scores automatically

## 🎨 Customization

### Translations

Edit translation files in `/resources/locale/`:
- `en.yml`: English translations
- `tr.yml`: Turkish translations

Add your own language by creating a new YAML file.

### Styling

- Forum styles: `/resources/less/forum.less`
- Admin styles: `/resources/less/admin.less`

### Point System

Adjust in Admin Settings or modify `UpdateUserScoresListener.php` for custom calculation logic.

## 🛠️ Development

```bash
# Install dependencies
composer install
cd js
npm install

# Build frontend
npm run build

# Watch for changes (development)
npm run dev

# Run tests
composer test

# Code style check
composer cs

# Code style fix
composer cs:fix

# Static analysis
composer analyse

# Run all quality checks
composer qa:full
```

## 📁 Project Structure

```
pickem/
├── extend.php                      # Extension configuration
├── composer.json                   # Package definition
├── src/
│   ├── Event.php                  # Match/Event model
│   ├── Pick.php                   # User pick model
│   ├── UserScore.php              # Cached score model
│   ├── Team.php                   # Team model
│   ├── Season.php                 # Season model
│   ├── Week.php                   # Week model
│   ├── Api/
│   │   ├── Controller/            # API controllers
│   │   └── Serializer/            # JSON API serializers
│   ├── Validator/                 # Input validators
│   ├── Access/                    # Authorization policies
│   ├── Listener/                  # Event listeners
│   ├── Console/                   # CLI commands
│   └── Notification/              # Notification blueprints
├── migrations/                    # Database migrations
├── js/
│   └── src/
│       ├── admin/                 # Admin panel components
│       ├── forum/                 # User-facing components
│       └── common/                # Shared components
└── resources/
    ├── locale/                    # Translations
    └── less/                      # Styles
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run quality checks: `composer qa:full`
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Hüseyin Filiz**
- GitHub: [@huseyinfiliz](https://github.com/huseyinfiliz)
- Email: mysuperuser01@gmail.com

## 🙏 Support

If you find this extension helpful:
- ⭐ Star the repository
- 🐛 Report bugs via GitHub Issues
- 💡 Suggest features via GitHub Discussions
- 📖 Improve documentation

## 🔗 Links

- [Flarum](https://flarum.org)
- [Documentation](https://github.com/huseyinfiliz/pickem/wiki)
- [Issue Tracker](https://github.com/huseyinfiliz/pickem/issues)
- [Flarum Community](https://discuss.flarum.org)

---

**Flarum 1.8 Compatible** | Built with ❤️ for the Flarum community