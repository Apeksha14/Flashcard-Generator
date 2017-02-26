// Cloze Deleted Flashcard Constructor for cloze flashcards with full text and cloze deleted flashcards.
var ClozeCard = function (text, cloze) {
    
    this.text = text; //full text
    
    this.cloze = cloze; // cloze-deleted text

    this.partial = ""; // partial text
   
    // function that returns partial text
    this.showPartial = function () {
           
        this.partial = this.text.replace(this.cloze,"........");          

        return (this.partial);
    };
    
    // function that returns cloze-deleted text
    this.showCloze = function () {
        
        return (this.cloze);
    
    };
    
    // function that returns full text
    this.showAll = function () {
        
        return (this.text);
    
    };

 }

module.exports = ClozeCard;