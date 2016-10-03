### Lobby Lister


##Media Industry Lobbying Exposure Tool
<<<<<<< HEAD
      How much organizations are paying lobbyists to effect political action in their industry.
=======
      How much organizations are paying lobbyists and how it's effecting political action.
>>>>>>> 0ad5094d797e062aaaaba09282142b3586c8fec3

***
##User Stories
  As a guest, I should be able to search a company and see how much they've sepent on lobbying efforts.
  As a user, I should be able to save search results of my preference to a private page for access later.
  As an admin, I should be able to manage user accounts.
  

  ***
  ##To Do
    1. Finishing routing the user save feature.  Currently the data is storing in Mongo
        but I ran out of time to finish routing it to the page.
    2. Add the secondary API that enables to the user to view the actual bill to which
        the money can be tied.  This is totally doable by tying 'transation ID's between
        the Enigma API and US Senate Database.  I prioritized attempting to finish the 
        MVP over completing all my desired features.  
    3. Fix up the CSS of the site. Currency formatting, etc
    4. More additional features to add.
        *filter by industry
        *filter by cause category
        *for past bills, show the outcome
    5. Data Visualization
        *flesh out data Visualizations to show their impact on the industry.
