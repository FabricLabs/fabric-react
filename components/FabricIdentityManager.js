'use strict';

import React, { Component } from 'react';
import { Button, Modal, List, Icon, Form, Message } from 'semantic-ui-react';

class FabricIdentityManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      identities: [],
      currentView: 'list', // 'list', 'create', 'restore'
      derivationPassword: '',
      passwordConfirmation: '',
      passwordError: null,
      isCreating: false
    };
  }

  handleOpen = () => this.setState({ isModalOpen: true });
  handleClose = () => this.setState({ 
    isModalOpen: false,
    currentView: 'list',
    derivationPassword: '',
    passwordConfirmation: '',
    passwordError: null,
    isCreating: false
  });

  handleCreateNew = () => this.setState({ currentView: 'create' });
  handleRestore = () => this.setState({ currentView: 'restore' });
  handleBack = () => this.setState({ 
    currentView: 'list',
    derivationPassword: '',
    passwordConfirmation: '',
    passwordError: null,
    isCreating: false
  });

  handlePasswordChange = (e) => {
    this.setState({ 
      derivationPassword: e.target.value,
      passwordError: null
    });
  };

  handlePasswordConfirmationChange = (e) => {
    this.setState({ 
      passwordConfirmation: e.target.value,
      passwordError: null
    });
  };

  validatePassword = () => {
    const { derivationPassword, passwordConfirmation } = this.state;

    if (!derivationPassword) {
      return 'Password is required';
    }

    if (derivationPassword.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    if (!/[A-Z]/.test(derivationPassword)) {
      return 'Password must contain at least one uppercase letter';
    }

    if (!/[a-z]/.test(derivationPassword)) {
      return 'Password must contain at least one lowercase letter';
    }

    if (!/[0-9]/.test(derivationPassword)) {
      return 'Password must contain at least one number';
    }

    if (!/[!@#$%^&*]/.test(derivationPassword)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }

    if (derivationPassword !== passwordConfirmation) {
      return 'Passwords do not match';
    }

    return null;
  };

  handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const error = this.validatePassword();
    if (error) {
      this.setState({ passwordError: error });
      return;
    }

    this.setState({ isCreating: true });

    try {
      // TODO: Implement actual identity creation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // For now, just add a dummy identity
      const newIdentity = {
        id: 'id' + Math.random().toString(36).substr(2, 9),
        name: 'New Identity',
        created: new Date().toISOString()
      };

      this.setState(prevState => ({
        identities: [...prevState.identities, newIdentity],
        currentView: 'list',
        derivationPassword: '',
        passwordConfirmation: '',
        passwordError: null,
        isCreating: false
      }));
    } catch (error) {
      this.setState({ 
        passwordError: 'Failed to create identity. Please try again.',
        isCreating: false
      });
    }
  };

  renderDerivationPasswordForm = () => (
    <Form onSubmit={this.handlePasswordSubmit}>
      <Form.Field>
        <label>Derivation Password</label>
        <Form.Input
          type="password"
          placeholder="Enter a secure password"
          value={this.state.derivationPassword}
          onChange={this.handlePasswordChange}
          error={!!this.state.passwordError}
          disabled={this.state.isCreating}
        />
      </Form.Field>
      <Form.Field>
        <label>Confirm Password</label>
        <Form.Input
          type="password"
          placeholder="Confirm your password"
          value={this.state.passwordConfirmation}
          onChange={this.handlePasswordConfirmationChange}
          error={!!this.state.passwordError}
          disabled={this.state.isCreating}
        />
      </Form.Field>
      {this.state.passwordError && (
        <Message negative>
          <p>{this.state.passwordError}</p>
        </Message>
      )}
      <Message info>
        <Message.Header>Important</Message.Header>
        <p>This password will be used to derive your master keys. Store it securely along with your seed phrase.</p>
        <p>Password requirements:</p>
        <ul>
          <li>At least 8 characters long</li>
          <li>Contains at least one uppercase letter</li>
          <li>Contains at least one lowercase letter</li>
          <li>Contains at least one number</li>
          <li>Contains at least one special character (!@#$%^&*)</li>
        </ul>
      </Message>
      <Button.Group fluid>
        <Button
          content='Back'
          onClick={this.handleBack}
          disabled={this.state.isCreating}
        />
        <Button.Or />
        <Button
          primary
          content={this.state.isCreating ? 'Creating...' : 'Continue'}
          type="submit"
          loading={this.state.isCreating}
          disabled={this.state.isCreating}
        />
      </Button.Group>
    </Form>
  );

  render() {
    const { isModalOpen, identities, currentView } = this.state;

    return (
      <>
        <Button
          icon='user'
          content='Manage Identities'
          onClick={this.handleOpen}
        />

        <Modal
          open={isModalOpen}
          onClose={this.handleClose}
          size='small'
        >
          <Modal.Header>Identity Manager</Modal.Header>
          <Modal.Content>
            {currentView === 'list' ? (
              identities.length > 0 ? (
                <List divided relaxed>
                  {identities.map((identity, index) => (
                    <List.Item key={index}>
                      <List.Icon name='user' size='large' verticalAlign='middle' />
                      <List.Content>
                        <List.Header>{identity.name || 'Unnamed Identity'}</List.Header>
                        <List.Description>{identity.id}</List.Description>
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              ) : (
                <div style={{ textAlign: 'center', padding: '2em' }}>
                  <p>No identities found. Would you like to:</p>
                  <Button.Group vertical fluid>
                    <Button
                      primary
                      content='Create New Identity'
                      icon='plus'
                      onClick={this.handleCreateNew}
                      style={{ marginBottom: '1em' }}
                    />
                    <Button
                      content='Restore Existing Identity'
                      icon='history'
                      onClick={this.handleRestore}
                    />
                  </Button.Group>
                </div>
              )
            ) : currentView === 'create' ? (
              this.renderDerivationPasswordForm()
            ) : (
              <div>Restore form coming soon...</div>
            )}
          </Modal.Content>
          {currentView === 'list' && (
            <Modal.Actions>
              <Button onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Actions>
          )}
        </Modal>
      </>
    );
  }
}

export default FabricIdentityManager;
