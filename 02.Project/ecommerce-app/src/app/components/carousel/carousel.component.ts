import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements OnInit, OnChanges, OnDestroy {
  @Input() images: {
    src: string;
    loaded: boolean;
    loading: boolean;
    alt: string;
  }[] = [
    { src: 'images/bread.jpg', loaded: false, loading: false, alt: '' },
    { src: 'images/esp32.jpg', loaded: false, loading: false, alt: '' },
    { src: 'images/fruta.jpg', loaded: false, loading: false, alt: '' },
    { src: 'images/silksong.jpg', loaded: false, loading: false, alt: '' },
  ];
  @Input() autoPlay: boolean = true;
  @Input() showIndicators: boolean = true;
  @Input() showControls: boolean = true;
  @Input() interval: number = 5000;

  currentIndex = 0;
  private isDestroyed: boolean = false;
  private autoPlayInterval?: number;

  ngOnInit(): void {
    this.loadImage(0);
    if (this.autoPlay) {
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && !changes['images'].firstChange){
      this.currentIndex = 0;
      this.resetLoadedStates();
      this.loadImage(this.currentIndex);
    }
    if (changes['autoplay'] && changes['autoplay'].firstChange) {
      if (changes['autoplay'].currentValue) {
        this.startAutoPlay();
      }else{
        this.stopAutoPlay();
      }
    }
    if (changes['interval'] && !changes['interval'].firstChange && this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }

  }
  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  loadImage(index: number) {
    if (index < 0 || index >= this.images.length) {
      return;
    }
    if (this.images[index].loaded) {
      return;
    }

    this.images[index].loading = true;

    const img = new Image();
    //<img src='' alt=''>
    img.onload = () => {
      console.log(`imagen en la posicion ${index}`);
      setTimeout(() => {
        this.images[index].loading = false;
        this.images[index].loaded = true;
      }, 1000);
      img.src = this.images[index].src;
    };
  }

  startAutoPlay(){
    if (this.autoPlay || !this.isDestroyed) {
      this.autoPlayInterval = window.setInterval(()=>{
        console.log(this.currentIndex)
        this.nextImage();
      }, this.interval)
    }
  }
  nextImage(){
    this.currentIndex = (this.currentIndex + 1 ) % this.images.length;
    this.loadImage(this.currentIndex);
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    this.loadImage(nextIndex);
  }
  prevImage(){
    this.currentIndex = (this.currentIndex - 1 ) % this.images.length;
    this.loadImage(this.currentIndex);
    const nextIndex = (this.currentIndex - 1) % this.images.length;
    this.loadImage(nextIndex);
  }

  stopAutoPlay(){
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = undefined;
    }
  }
  resetLoadedStates(){
    this.images.forEach(img=>{
      img.loaded = false;
      img.loading = false;
    })
  }
  cancelPendingImagesLoaded(){
    this.images.forEach(img=>{
      img.loading = false;
    })
  }
}
