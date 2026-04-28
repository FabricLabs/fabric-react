# `@fabric/react`
Fabric integration for React applications.

Install peers (no Hub package required — Hub can depend on this library later):

```sh
npm install @fabric/react @fabric/core @fabric/http react react-dom semantic-ui-react
```

## Platform behavior

**`Bridge`** is a React class in this package. It uses `@fabric/http` **`Remote`** for the WebSocket client, `@fabric/core` **`Message`** / **`Key`** for wire signing, keeps a **JSON-Patch**–ready **`globalState`**, and exposes the same **static `Bridge.fabric`** helpers (formatting, envelopes, peer identity, safe logging, message type constants) as named exports from the package root.

WebRTC mesh behavior from the production Hub UI is **not** ported yet: `initializeWebRTC`, `reconnectWebRTC`, and related methods are stubs or no-ops until implemented here. Chat submission (`submitChatMessage`) is stubbed until the full identity pipeline is wired.

```jsx
import { Bridge, formatSatsDisplay, createEnvelope } from '@fabric/react';

formatSatsDisplay(50_000);
Bridge.fabric.format.formatSatsDisplay(50_000);
createEnvelope('Demo', { hello: 'world' });
```

## Quick Start

```jsx
import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

import { Bridge } from '@fabric/react';

class App extends Component {
  render () {
    return (
      <Container>
        <Bridge />
        <Header>
          <h1>Hello, world!</h1>
        </Header>
      </Container>
    );
  }
}
export default App;
```
