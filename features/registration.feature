Feature: User sign up and registration

  As a User
  I want to plan out an itenerary

  @active
  Scenario: A user signs up with valid information
    Given I am on the sign up page
    When I sign up as a user with email "chwongris@gmail.com"
    Then I should have an account

  Scenario: A user signs up with facebook signon information
    Given I am on the sign up page
    When I click on the button "Sign in with Facebook"
    Then I should have an account
      And I should have an email
      And I should have a profile picture

  Scenario: A user logs in with valid information
    Given I am on the login page
    And I have already registered as "chwongris@gmail.com"
    When I login with email "chwongris@gmail.com"
    Then I should see "Welcome Back"

  Scenario: A user logs in with facebook signin
    Given I am on the sign up page
    When I click on the button "Facebook"
    Then I should see "Welcome Back"