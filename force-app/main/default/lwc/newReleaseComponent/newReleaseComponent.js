import { LightningElement } from 'lwc';

export default class NewReleaseComponent extends LightningElement {

  position = "left";
  fullWidth = true;
  hidden = false;

  static renderMode = "light";

//   setStyle() {
//     this.style.setProperty('color', 'red');
//     this.style.setProperty('border', '1px solid eee');
//     this.style.setProperty('border-radius', '12px');
//     this.style.setProperty('background-color', 'blue');
//   }

//   renderedCallback() {
//     this.style.color = 'green';
//  }

//   get computedClassNames() {
//     return [
//       "div__block",
//       this.position && `div_${this.position}`,
//       {
//         "div_full-width": this.fullWidth,
//         hidden: this.hidden,
//       },
//     ];
//   }

  styleHandler() {
    let myStyle = document.styleSheets[0];
    console.log('my style => ', myStyle);
  }

  onChangeHandler(event) {
    // let elm = document.getElementById('circle-box');

    // elm.style.backgroundColor = 'red';
  }


  handleSlidingEffect() {
    $(document).ready(function() {
      var slides = $('.slide');
      var slideWidth = slides.first().width();
      var currentSlide = 1;
    
      function scrollContent() {
        $('.scrolling-content').scrollLeft(currentSlide * slideWidth);
        currentSlide += 1;
        if (currentSlide > slides.length) {
          currentSlide = 1;
        }
      }
    
      function startScrolling() {
        setInterval(scrollContent, 3000); // 3 seconds between slides
      }
    
      startScrolling();
    });
  }


  


  

}