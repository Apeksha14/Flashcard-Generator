//Basic Flash Card Constructor with arguments front and back

var BasicCard = function(front, back) {
    
    this.front = front;
    
    this.back = back;
    
    // method that returns the front of the flashcard
    this.showFront = function() {
        
        return(this.front);
    
    };
    
    // method that returns the back of the flashcard
	this.showBack = function() {
        
        return(this.back);
    
    };
};

module.exports = BasicCard;