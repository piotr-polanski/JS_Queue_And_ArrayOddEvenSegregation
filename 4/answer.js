"use strict"
/* 

Write a simple queuing system in pure javascript.

The queue should implement add, view and delete methods. 
A viewed message will become invisible to other workers for 1 second unless it is deleted.
Messages should be returned in order they were added unless they have been deleted.

The add method takes a string as a message and returns a unique id for that message.

The view method takes no parameters and returns a hash containing the unique message
id assigned in the add method and the message itself.

The delete method takes the unique message id and returns true if the message was removed
within 1 second or false if we were too slow and the message is back in the queue.

Write your implementation in this file below.

Extra points: Do you see any problems with running this kind of queue in a production envrionment? 

*/

// *** Write your Queue class here *** //


/*
Extra points answer:
Usually queues have only two methods for queue manipulation: Enqueue and Dequeue. Enqueue for putting item at the end of the queue and Dequeue for removing first queue item. 
By allowing queue clients to remove any viewed queue item by id we no longer can trust queue order, so if we would have some order specific item/actions in the queue then the system will break. 
*/
var Queue = function(){

	var items = []
	var removedItemsCount = 0
	
	function add(messageText){
		let messageId = items.length+1
		items.push(new Message(messageId, messageText))
		return messageId
	}
	
	function view(){
		let firstVisibleItem = items.find((item) => item.isVisible())		

		if(firstVisibleItem){
			firstVisibleItem.setAsInvisible()
			return firstVisibleItem	 	
		}
	}
	
	function remove(id){	
		let itemToRemove = items.find((item) => 
			item.messageId === id 
			&& item.isInvisible())
			
		if(itemToRemove){
			itemToRemove.setAsRemoved()
			removedItemsCount++
			
			shrinkQueueIfNeeded()
			
			return true
		}	
		return false		
	}

	function shrinkQueueIfNeeded(){
		if(removedItemsCount >= items.length/2){			
			items = items.filter((item) => item.isNotRemoved())	
		}
	}
	
	return{
		add: add,
		view: view,
		remove: remove
	}
}

var Message = function(messageId, messageText){
	var messageId = messageId
	var messageText = messageText
	var viewTime = undefined
	var isRemoved = false
	
	function isVisible(){
		if(!isRemoved){
			return wasWievedMoreThanSecondAgo()
		}	
		else{
			return false
		}		
	}
	
	function wasWievedMoreThanSecondAgo(){
		if(viewTime){
			let secondsDiff = (new Date() - viewTime) / 1000
			return secondsDiff >= 1
		}
		else{
			return true
		}
	}
	
	function isInvisible(){
		return !isVisible()
	}
	
	function setAsInvisible(){
		viewTime = new Date()
	}
	
	function setAsRemoved(){
		isRemoved = true
	}

	function isNotRemoved(){
		return !isRemoved
	}
	
	return {
		messageId: messageId,
		message: messageText,
		isVisible: isVisible,
		isInvisible: isInvisible,
		setAsInvisible: setAsInvisible,
		setAsRemoved: setAsRemoved
	}
	
}
// *** Finish your code here *** //

// Test code. Should output the following
/*
  Hey there world. How are you?
  Hey there world. How are you?
  Hey world. How are you?
  Hey world. How you?
*/
var queue = new Queue();
queue.add('Hey');
queue.add('there');
queue.add('world.');
queue.add('How');
queue.add('are');
queue.add('you?');

printQueue();

setTimeout(function(){
  printQueue();
}, 200);

setTimeout(function(){
  printQueue(1);
}, 1500);

setTimeout(function(){
  printQueue(3);
}, 3000);

setTimeout(function(){
  printQueue();
}, 4500);


// Private function
function printQueue(index){
  var i = 0;
  var messageHash = queue.view();  
  var output = '';
  while(messageHash){
    output += messageHash.message;
    output += ' ';
    if(i++ == index) {
		queue.remove(messageHash.messageId);
		}
    messageHash = queue.view();
  }
  if(output) console.log(output);
}