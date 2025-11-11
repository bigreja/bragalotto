import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';

export default class TeamModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.team = this.attrs.team;
    this.name = this.team ? this.team.name() : '';
    this.slug = this.team ? this.team.slug() : '';
    this.logoPath = this.team ? this.team.logoPath() : '';
    this.logoUploadMode = 'url'; // 'url' or 'upload'
    this.logoFile = null;
    this.uploading = false;
  }

  className() {
    return 'TeamModal Modal--small';
  }

  title() {
    return app.translator.trans(
      this.team ? 'huseyinfiliz-pickem.admin.teams.edit_title' : 'huseyinfiliz-pickem.admin.teams.create_title'
    );
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.teams.name')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.name}
              oninput={(e) => {
                this.name = e.target.value;
                if (!this.team) {
                  this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                }
              }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.teams.slug')}</label>
            <input
              className="FormControl"
              type="text"
              value={this.slug}
              oninput={(e) => { this.slug = e.target.value; }}
            />
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('huseyinfiliz-pickem.admin.teams.logo')}</label>
            
            <div className="ButtonGroup" style="margin-bottom: 10px;">
              <Button
                className={`Button ${this.logoUploadMode === 'url' ? 'Button--primary' : ''}`}
                onclick={() => { this.logoUploadMode = 'url'; }}
              >
                <i className="fas fa-link"></i> URL
              </Button>
              <Button
                className={`Button ${this.logoUploadMode === 'upload' ? 'Button--primary' : ''}`}
                onclick={() => { this.logoUploadMode = 'upload'; }}
              >
                <i className="fas fa-upload"></i> Upload
              </Button>
            </div>

            {this.logoUploadMode === 'url' ? (
              <input
                className="FormControl"
                type="text"
                value={this.logoPath}
                oninput={(e) => { this.logoPath = e.target.value; }}
                placeholder="https://example.com/logo.png or assets/teams/logo.png"
              />
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onchange={(e) => { this.logoFile = e.target.files[0]; }}
                  className="FormControl"
                />
                {this.uploading && (
                  <div className="helpText">
                    <i className="fas fa-spinner fa-spin"></i> Uploading...
                  </div>
                )}
              </div>
            )}

            {this.logoPath && this.logoUploadMode === 'url' && (
              <div style="margin-top: 10px;">
                <img 
                  src={this.logoPath.startsWith('http') ? this.logoPath : `${app.forum.attribute('baseUrl')}/assets/${this.logoPath}`} 
                  alt="Logo preview" 
                  style="max-width: 100px; max-height: 100px; border: 1px solid #ddd; padding: 5px; border-radius: 4px;"
                  onerror={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <div className="Form-group">
            <Button
              className="Button Button--primary"
              type="submit"
              loading={this.loading}
              disabled={this.uploading}
            >
              {app.translator.trans('core.admin.basics.submit_button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  async onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    try {
      // Handle file upload if needed
      if (this.logoUploadMode === 'upload' && this.logoFile) {
        this.uploading = true;
        m.redraw();
        
        const uploadedPath = await this.uploadLogo(this.logoFile);
        this.logoPath = uploadedPath;
        this.uploading = false;
      }

      const data = {
        name: this.name,
        slug: this.slug,
        logoPath: this.logoPath,
      };

      const promise = this.team
        ? this.team.save(data)
        : app.store.createRecord('pickem-teams').save(data);

      await promise;
      this.hide();
      m.redraw();
    } catch (error) {
      this.loading = false;
      this.uploading = false;
      this.alertAttrs = error.alert || {
        type: 'error',
        content: 'An error occurred while saving the team.'
      };
      m.redraw();
    }
  }

  /**
   * Upload logo to assets folder
   * This is a placeholder - you'll need to implement actual upload logic
   */
  async uploadLogo(file) {
    const formData = new FormData();
    formData.append('logo', file);

    // TODO: Implement actual upload endpoint
    // For now, return a placeholder path
    // In production, you should:
    // 1. Create an upload endpoint in your extension
    // 2. Or integrate with fof/upload if available
    // 3. Store file in public/assets/teams/ folder
    
    try {
      const response = await fetch(app.forum.attribute('apiUrl') + '/pickem/upload-logo', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': app.session.csrfToken,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.path; // Return uploaded file path
    } catch (error) {
      console.error('Logo upload error:', error);
      // Fallback to a placeholder or show error
      alert('Logo upload failed. Please use URL option instead.');
      this.logoUploadMode = 'url';
      throw error;
    }
  }
}