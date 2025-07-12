const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://puppaladeekshitha2:deekshitha%4022@cluster0.vx5dd6t.mongodb.net/gumRoadProject";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected!');
});

// Your schemas and models below
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const productSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },  
    products :[{
        productName : {
            type: String,
            required: true,
            trim: true,
            maxLength: 100
        },
        productDescription : {
            type: String,
            required: true,
            trim: true,
            maxLength: 500
        },
        productThumbnail : {
            type: String,
            required: true,
            trim: true,
            maxLength: 500
        },
        productFile : {
            type: String,
            required: true,
            trim: true,
            maxLength: 500
        },
        sales : {
            type: Number,
            required: true,
            default: 0
        },
        revenue : {
            type: Number,
            required: true,
            default: 0
        },
        price : {
            type: Number,
            required: true,
            default: 0
        },
        published : {
            type: Boolean,
            required: true,
            default: false
        }
    }]
});

const PublishedProductSchema = new mongoose.Schema({
    productId : {
        type: String,
        required: true
    },
    productOwner :{
        type: String,
        required: true
    },
    productName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },

    productDescription : {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    productThumbnail : {
        type: String,
        required: true,
        trim: true,
        maxLength: 500
    },
    sales : { 
        type: Number,
        required: true,
        default: 0
    },
    price : {
        type: Number,
        required: true,
        default: 0
    }
});

const User = mongoose.model("User",userSchema);
const Product = mongoose.model("Product",productSchema);
const PublishedProducts = mongoose.model("PublishedProducts",PublishedProductSchema); 

module.exports  = {
    User,
    Product,
    PublishedProducts
};