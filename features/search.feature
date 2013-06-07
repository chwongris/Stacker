Feature: Search

  As a User
  I want to search for items to put on my itenerary

# Background:
#   Given I am logged in

  Scenario: A user searches by location for restaurants
    Given I am logged in
    And I am on the search page
    When I enter a search location "west village"
    Then I should have longitude and latitude

  # Scenario: A user searches by location for concerts
  #   Given I am logged in
  #   And I am on the search page
  #   When I enter a search location "west village"
  #   Then I should have search results of concerts

  # Scenario: A user searches by location for bars and nightlife
  #   Given I am logged in
  #   And I am on the search page
  #   When I enter a search location "west village"
  #   Then I should have search results of bars and nightlife

