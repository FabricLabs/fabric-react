'use strict';

import Site from '@fabric/http/types/site.js';

class Interface extends Site {
  _getHTML () {
    return `
      <${this.settings.handle}>
        <fabric-card class="ui card">
          <fabric-card-content class="content">
            <fabric-header>
              <h1><code>@fabric/react</code></h1>
            </fabric-header>
          </fabric-card-content>
        </fabric-card>
      </${this.settings.handle}>
    `;
  }
}

export default Interface;
