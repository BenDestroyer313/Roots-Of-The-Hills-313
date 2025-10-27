
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_ARTISANS, MOCK_STORIES, MOCK_REVIEWS } from '../constants';
import Header from '../components/Header';
import { Heart, ShoppingCart, Share2, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import type { Review } from '../types';
import StarRating from '../components/StarRating';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { currentUser, addToCart, wishlist, toggleWishlist } = useAppContext();
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    const artisan = product ? MOCK_ARTISANS.find(a => a.id === product.artisanId) : null;
    const story = product ? MOCK_STORIES.find(s => s.id === product.storyId) : null;

    // Review State
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS.filter(r => r.productId === id));
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState("");

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product || !artisan || !story) {
        return <div>Product not found</div>;
    }

    const isWishlisted = wishlist.includes(product.id);

    const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

    const handleReviewSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newRating > 0 && newComment.trim() !== "" && currentUser) {
        const newReview: Review = {
          id: `r${Date.now()}`,
          productId: product.id,
          userId: currentUser.id,
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
          rating: newRating,
          comment: newComment,
          date: new Date().toISOString().split('T')[0],
        };
        setReviews(prev => [newReview, ...prev]);
        setNewRating(0);
        setNewComment("");
      }
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="bg-rh-off-white min-h-screen">
            <Header title={product.title} actions={
                <button className="p-2 rounded-full hover:bg-gray-200"><Share2 className="w-5 h-5" /></button>
            } />
            
            {/* Image Carousel */}
            <div className="relative">
                <img src={product.images[currentImageIndex]} alt={product.title} className="w-full h-80 object-cover"/>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50">
                    <ChevronLeft />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50">
                    <ChevronRight />
                </button>
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="text-sm bg-rh-blue/20 text-rh-blue px-3 py-1 rounded-full font-medium">{product.category}</span>
                        <h1 className="text-3xl font-bold text-rh-dark mt-2">{product.title}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <StarRating rating={averageRating} readOnly={true} />
                            <span className="text-gray-600 text-sm">({reviews.length} reviews)</span>
                        </div>
                    </div>
                    <span className="text-3xl font-bold text-rh-green">₹{product.price}</span>
                </div>

                {/* Artisan Card */}
                <Link to={`/artisan/${artisan.id}`} className="mt-6 bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <img src={artisan.image} alt={artisan.name} className="w-16 h-16 rounded-full object-cover"/>
                    <div>
                        <p className="text-sm text-gray-500">Handcrafted by</p>
                        <h3 className="text-lg font-semibold text-rh-dark">{artisan.name}</h3>
                        <p className="text-sm text-rh-terracotta">{artisan.village}, {product.region}</p>
                    </div>
                </Link>

                 {/* Story Snippet */}
                <div className="mt-6">
                     <h3 className="text-xl font-bold text-rh-dark mb-2">The Story Behind</h3>
                     <p className="text-gray-600 italic">"{story.content.substring(0, 150)}..."</p>
                     <div className="mt-4 flex gap-4">
                        <Link to={`/story/${story.id}`} className="flex-1 text-center py-3 bg-rh-green/10 text-rh-green rounded-lg font-semibold hover:bg-rh-green/20 transition-colors">
                            Read Full Story
                        </Link>
                        <button className="flex items-center justify-center gap-2 py-3 px-4 bg-rh-terracotta/10 text-rh-terracotta rounded-lg font-semibold hover:bg-rh-terracotta/20 transition-colors">
                            <Volume2 className="w-5 h-5"/>
                            Listen
                        </button>
                     </div>
                </div>

                {/* Impact Meter */}
                <div className="mt-6 bg-green-50 p-4 rounded-xl">
                    <h3 className="font-bold text-green-800">Your Impact</h3>
                    <p className="text-sm text-green-700 mt-1">This purchase supports <strong>3 families</strong> and saves <strong>12km</strong> in carbon transport.</p>
                </div>
                 <p className="mt-6 text-gray-700">{product.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="p-6 bg-white/50 mt-4">
              <h3 className="text-xl font-bold text-rh-dark mb-4">Reviews & Ratings</h3>
              
              <form onSubmit={handleReviewSubmit} className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">Leave a Review</h4>
                <div className="mb-2">
                  <StarRating rating={newRating} onRatingChange={setNewRating} />
                </div>
                <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-rh-terracotta focus:outline-none"
                  rows={3}
                ></textarea>
                <button type="submit" className="mt-2 px-4 py-2 bg-rh-green text-white font-semibold rounded-lg hover:bg-rh-green/90 disabled:bg-gray-400" disabled={!newRating || !newComment.trim()}>Submit Review</button>
              </form>

              <div className="space-y-6">
                {reviews.length > 0 ? reviews.map(review => (
                  <div key={review.id} className="flex gap-4">
                    <img src={review.userAvatar} alt={review.userName} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold">{review.userName}</p>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <StarRating rating={review.rating} readOnly={true} starClassName="w-4 h-4" />
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center">No reviews yet. Be the first!</p>
                )}
              </div>
            </div>

             {/* Sticky Footer */}
            <div className="sticky bottom-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex items-center gap-4">
                <button onClick={() => toggleWishlist(product.id)} className="p-4 rounded-lg border border-gray-300">
                    <Heart className={`w-6 h-6 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
                </button>
                <button onClick={() => addToCart(product)} className="flex-1 bg-rh-terracotta text-white py-4 rounded-lg text-lg font-bold flex items-center justify-center gap-2 hover:bg-rh-terracotta/90">
                    <ShoppingCart className="w-6 h-6"/>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
