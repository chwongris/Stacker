Feature: Search

  As a User
  I want to plan iteneraries with facebook friends and stacker friends

  Scenario: A user can search for friends to add to their stack
    Given I have created a stack
    When I search for friends
    Then I can add them to my stack list

  Scenario: A user can see stacks their friends have created
    Given A friend has created a stack
    When I search for friends
    And I can see their stacks
    Then I can add items on their stack to my stack

    Scenario: A user can see stacks their friends have created
    Given A friend has created a stack
    When I search for friends
    And I can see their stacks
    Then I can like their entire stack