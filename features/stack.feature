Feature: Stack

  As a User
  I want to plan iteneraries from items from search and my todolist

  Scenario: A user adds search results to their todolist
    Given I am logged in
    And I am on the search page
    And I enter a search location "west village"
    When I have search results of bars and nightlife
    Then I can add it to my todolist

  Scenario: A user adds items to their stack
    Given I am logged in
    And I am on the search page
    And I enter a search location "west village"
    When I have search results of bars and nightlife
    And I have items on my todolist
    Then I can add it to my stack

   Scenario: A user adds more stacks to their stack
    Given I have search results of bars and nightlife
    And I have items on my todolist
    When I add it to my stack
    Then I can add a new stack with a category


